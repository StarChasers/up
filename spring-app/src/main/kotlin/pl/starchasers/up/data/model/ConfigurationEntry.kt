package pl.starchasers.up.data.model

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.enum
import org.ktorm.schema.long
import org.ktorm.schema.text
import java.time.Duration
import java.time.temporal.ChronoUnit

interface ConfigurationEntry : Entity<ConfigurationEntry> {
    companion object : Entity.Factory<ConfigurationEntry>()
    val id: Long
    var key: ConfigurationKey
    var value: String
}

object ConfigurationEntries : Table<ConfigurationEntry>("configuration_entry") {
    val id      = long("id").primaryKey().bindTo { it.id }
    val key     = enum<ConfigurationKey>("configuration_key").bindTo { it.key }
    val value   = text("configuration_value").bindTo { it.value }
}

enum class ConfigurationKey(val defaultValue: String) {
    /**
     * Maximum allowed file size in bytes for anonymous uploads.
     * Default value: 1GiB
     */
    ANONYMOUS_MAX_FILE_SIZE("${1L * 1024 * 1024 * 1024}"),

    /**
     * Default time in milliseconds, after which uploaded anonymous file will be deleted
     * Default value: 1 day
     */
    ANONYMOUS_DEFAULT_FILE_LIFETIME(Duration.of(1, ChronoUnit.DAYS).toMillis().toString()),

    /**
     * Maximum configurable by user time in milliseconds, after which uploaded anonymous file will be deleted.
     * Default value: 1 day
     */
    ANONYMOUS_MAX_FILE_LIFETIME(Duration.of(1, ChronoUnit.DAYS).toMillis().toString()),
}
