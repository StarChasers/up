package pl.starchasers.up.controller

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.apache.commons.io.IOUtils
import org.slf4j.LoggerFactory
import org.springframework.http.ContentDisposition
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import pl.starchasers.up.data.dto.upload.AuthorizedOperationDTO
import pl.starchasers.up.data.dto.upload.FileDetailsDTO
import pl.starchasers.up.data.dto.upload.UploadCompleteResponseDTO
import pl.starchasers.up.exception.AccessDeniedException
import pl.starchasers.up.exception.NotFoundException
import pl.starchasers.up.service.FileService
import pl.starchasers.up.service.FileStorageService
import pl.starchasers.up.util.BasicResponseDTO
import pl.starchasers.up.util.RequestRangeParser
import java.io.BufferedInputStream
import java.io.IOException
import java.nio.charset.Charset

@RestController
class UploadController(
    private val fileStorageService: FileStorageService,
    private val fileService: FileService,
    private val requestRangeParser: RequestRangeParser
) {

    private val logger = LoggerFactory.getLogger(this::class.java)

    /**
     * Upload new file
     * @param file Uploaded file content
     */
    @PostMapping("/api/upload")
    fun anonymousUpload(@RequestParam file: MultipartFile): UploadCompleteResponseDTO {
        val contentType =
            if (file.contentType == null || file.contentType!!.isBlank()) "application/octet-stream"
            else file.contentType!!

        return fileService.createFile(
            BufferedInputStream(file.inputStream),
            file.originalFilename ?: "file",
            contentType,
            file.size
        )
    }

    /**
     * Download a previously uploaded file
     * @param fileKey File key obtained during upload
     */
    @GetMapping("/u/{fileKey}")
    fun getAnonymousUpload(@PathVariable fileKey: String, request: HttpServletRequest, response: HttpServletResponse) {
        val (fileEntry, stream) = fileStorageService.getStoredFileRaw(fileKey)
        response.contentType = fileEntry.contentType

        response.addHeader(
            HttpHeaders.ACCEPT_RANGES,
            "bytes"
        )
        response.addHeader(
            HttpHeaders.CONTENT_DISPOSITION,
            ContentDisposition
                .builder("inline")
                .filename(fileEntry.filename.ifBlank { "file" }, Charset.forName("UTF-8"))
                .build()
                .toString()
        )
        try {
            val range = requestRangeParser(request.getHeader("Range"), fileEntry.size)

            if (range.partial) {
                response.addHeader(HttpHeaders.CONTENT_RANGE, "bytes ${range.from}-${range.to}/${fileEntry.size}")
                response.addHeader(HttpHeaders.CONTENT_LENGTH, range.responseSize.toString())
                response.status = HttpStatus.PARTIAL_CONTENT.value()
                IOUtils.copyLarge(stream, response.outputStream, range.from, range.responseSize)
            } else {
                response.addHeader(HttpHeaders.CONTENT_LENGTH, fileEntry.size.toString())
                IOUtils.copyLarge(stream, response.outputStream)
            }
            response.outputStream.flush()
        } catch (e: IOException) {
            logger.debug(e.toString())
        } finally {
            stream.close()
        }
    }

    /**
     * Verify requesting user's permission to modify this upload
     */
    @PostMapping("/api/u/{fileKey}/verify")
    fun verifyFileAccess(
        @PathVariable fileKey: String,
        @Validated @RequestBody
        operationDto: AuthorizedOperationDTO?
    ): BasicResponseDTO {
        val fileEntry = fileService.findFileEntry(fileKey) ?: throw NotFoundException()

        if (!fileService.verifyFileAccess(fileEntry, operationDto?.accessToken)) {
            throw AccessDeniedException()
        }
        return BasicResponseDTO()
    }

    @DeleteMapping("/api/u/{fileKey}")
    fun deleteFile(
        @PathVariable fileKey: String,
        @Validated @RequestBody
        operationDto: AuthorizedOperationDTO?
    ) {
        val fileEntry = fileService.findFileEntry(fileKey) ?: throw NotFoundException()

        if (!fileService.verifyFileAccess(fileEntry, operationDto?.accessToken)) {
            throw AccessDeniedException()
        }

        fileService.deleteFile(fileEntry)
    }

    /**
     * @return Uploaded file metadata
     */
    @GetMapping("/api/u/{fileKey}/details")
    fun getFileDetails(@PathVariable fileKey: String): FileDetailsDTO = fileService.getFileDetails(fileKey)
}
