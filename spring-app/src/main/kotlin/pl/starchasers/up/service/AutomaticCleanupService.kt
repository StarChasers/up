package pl.starchasers.up.service

import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import pl.starchasers.up.repository.FileEntryRepository
import pl.starchasers.up.repository.UploadRepository
import java.io.IOException
import java.io.PrintWriter
import java.io.StringWriter

@Service
class AutomaticCleanupService(
    private val fileEntryRepository: FileEntryRepository,
    private val uploadRepository: UploadRepository
) {

    private val logger = LoggerFactory.getLogger(AutomaticCleanupService::class.java)

    @Scheduled(fixedRateString = "\${up.cleanup-interval}")
    @Transactional
    fun cleanup() {
        val entriesToDelete = fileEntryRepository.findExpiredFiles()
        logger.info("Deleting ${entriesToDelete.size} expired files")

        entriesToDelete.forEach {
            try {
                if (uploadRepository.exists(it.key)) {
                    uploadRepository.delete(it.key)
                }
                it.delete()
            } catch (e: IOException) {
                val sw = StringWriter()
                val pw = PrintWriter(sw)
                e.printStackTrace(pw)
                logger.error("Unable to delete file ${it.key}. Exception:\n$sw")
            }
        }
    }
}
