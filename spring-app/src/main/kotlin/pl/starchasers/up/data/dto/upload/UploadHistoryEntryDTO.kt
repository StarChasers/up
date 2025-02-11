package pl.starchasers.up.data.dto.upload

import java.time.Instant

data class UploadHistoryEntryDTO(
    /**
     * Name of the file
     */
    val filename: String,
    /**
     * When was this file uploaded
     */
    val uploadDate: Instant,
    /**
     * Whether this file will be automatically deleted
     */
    val permanent: Boolean,
    /**
     * When will this file be automatically deleted. Null if temporary == false
     */
    val deleteDate: Instant?,
    /**
     * File size in bytes
     */
    val size: Long,
    /**
     * Mime type of this file. This string is used as content-type header when serving file to clients.
     */
    val mimeType: String,
    /**
     * File key used in file link.
     */
    val key: String
)
