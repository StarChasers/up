package pl.starchasers.up.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import pl.starchasers.up.data.dto.upload.FileDetailsDTO
import pl.starchasers.up.data.dto.upload.UploadCompleteResponseDTO
import pl.starchasers.up.data.model.ConfigurationKey.ANONYMOUS_MAX_FILE_SIZE
import pl.starchasers.up.data.model.FileEntry
import pl.starchasers.up.exception.FileTooLargeException
import pl.starchasers.up.exception.NotFoundException
import pl.starchasers.up.repository.FileEntryRepository
import pl.starchasers.up.util.Util
import java.io.InputStream
import java.time.Instant
import java.time.temporal.ChronoUnit

interface FileService {

    fun createFile(
        tmpFile: InputStream,
        filename: String,
        contentType: String,
        size: Long
    ): UploadCompleteResponseDTO

    fun verifyFileAccess(fileEntry: FileEntry, accessToken: String?): Boolean

    fun verifyFileAccess(fileKey: String, accessToken: String?): Boolean

    fun findFileEntry(fileKey: String): FileEntry?

    fun getFileDetails(fileKey: String): FileDetailsDTO

    fun deleteFile(fileEntry: FileEntry)

    fun getUploadHistory(pageable: Pageable): Page<FileEntry>
}

@Service
class FileServiceImpl(
    private val fileStorageService: FileStorageService,
    private val fileEntryRepository: FileEntryRepository,
    private val configurationService: ConfigurationService,
    private val charsetDetectionService: CharsetDetectionService
) : FileService {

    private val util = Util()

    @Transactional
    override fun createFile(
        tmpFile: InputStream,
        filename: String,
        contentType: String,
        size: Long
    ): UploadCompleteResponseDTO {
        val actualContentType = when {
            contentType.isBlank() -> "application/octet-stream"
            contentType == "text/plain" -> "text/plain; charset=" + charsetDetectionService.detect(tmpFile)
            else -> contentType
        }
        val personalLimit: Long = configurationService.getConfigurationOption(ANONYMOUS_MAX_FILE_SIZE).toLong()

        if (size > personalLimit) throw FileTooLargeException()

        val key = fileStorageService.storeNonPermanentFile(tmpFile, filename)
        // TODO check key already used
        val accessToken = generateFileAccessToken()
        val toDeleteAt = Instant.now().plus(1, ChronoUnit.DAYS)

        val fileEntry = FileEntry {
            this.accessToken = accessToken
            this.contentType = actualContentType
            this.createdAt = Instant.now()
            this.encrypted = false
            this.filename = filename
            this.key = key
            this.password = null
            this.size = size
            this.toDeleteAt = toDeleteAt
        }

        fileEntryRepository.insert(fileEntry)

        return UploadCompleteResponseDTO(key, accessToken, toDeleteAt)
    }

    override fun verifyFileAccess(fileEntry: FileEntry, accessToken: String?): Boolean {
        return (fileEntry.accessToken != null) && fileEntry.accessToken == accessToken
    }

    override fun verifyFileAccess(fileKey: String, accessToken: String?): Boolean =
        fileEntryRepository
            .findExistingFileByKey(fileKey)
            ?.let { verifyFileAccess(it, accessToken) } == true

    override fun findFileEntry(fileKey: String): FileEntry? = fileEntryRepository.findExistingFileByKey(fileKey)

    override fun getFileDetails(fileKey: String): FileDetailsDTO =
        fileEntryRepository.findExistingFileByKey(fileKey)?.let {
            FileDetailsDTO(
                it.key,
                it.filename,
                it.toDeleteAt == null,
                it.toDeleteAt,
                it.size,
                it.contentType
            )
        } ?: throw NotFoundException()

    override fun deleteFile(fileEntry: FileEntry) {
        fileStorageService.deleteFile(fileEntry)
    }

    override fun getUploadHistory(pageable: Pageable): Page<FileEntry> {
        return fileEntryRepository.findAll(pageable)
    }

    private fun generateFileAccessToken(): String = util.secureAlphanumericRandomString(128)
}
