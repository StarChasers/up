package pl.starchasers.up.data.model

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.Instant

interface FileEntry : Entity<FileEntry> {
    companion object : Entity.Factory<FileEntry>()
    val id: Long
    var accessToken: String?
    var contentType: String
    var createdAt: Instant
    var encrypted: Boolean
    var filename: String
    var key: String
    var password: String?
    var size: Long
    var toDeleteAt: Instant?
}

object FileEntries : Table<FileEntry>("file_entry") {
    val id = long("id").primaryKey().bindTo { it.id }
    val accessToken = text("file_access_token").bindTo { it.accessToken }
    val contentType = text("content_type").bindTo { it.contentType }
    val createdAt = timestamp("created_at").bindTo { it.createdAt }
    val encrypted = boolean("encrypted").bindTo { it.encrypted }
    val filename = text("filename").bindTo { it.filename }
    val key = text("file_key").bindTo { it.key }
    val password = text("file_password").bindTo { it.password }
    val size = long("file_size").bindTo { it.size }
    val deleteAt = timestamp("to_delete_at").bindTo { it.toDeleteAt }
}
