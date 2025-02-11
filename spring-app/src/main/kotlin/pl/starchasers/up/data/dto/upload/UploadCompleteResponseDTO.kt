package pl.starchasers.up.data.dto.upload

import java.time.Instant

data class UploadCompleteResponseDTO(
    /**
     * File identifier
     */
    val key: String,

    /**
     * File access token, allows modifying file properties after upload
     */
    val accessToken: String,

    /**
     * Date and time after which file will be deleted
     */
    val toDelete: Instant
)
