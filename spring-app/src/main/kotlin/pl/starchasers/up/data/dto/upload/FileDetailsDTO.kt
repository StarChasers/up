package pl.starchasers.up.data.dto.upload

import java.time.Instant

data class FileDetailsDTO(

    /**
     * File id
     */
    val key: String,
    /**
     * Filesystem filename
     */
    val name: String,
    /**
     * Will this file expire after some time
     */
    val permanent: Boolean,
    /**
     * File will expire at this date and download link will no longer work. Can be null, if file is permanent
     */
    val expirationDate: Instant?,
    /**
     * File size in bytes
     */
    val size: Long,
    /**
     * Content type, eg. "text/plain"
     */
    val type: String
)
