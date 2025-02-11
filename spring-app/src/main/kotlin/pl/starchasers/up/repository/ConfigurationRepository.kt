package pl.starchasers.up.repository

import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.springframework.stereotype.Service
import pl.starchasers.up.data.model.ConfigurationEntries
import pl.starchasers.up.data.model.ConfigurationEntry
import pl.starchasers.up.data.model.ConfigurationKey

@Service
class ConfigurationRepository(
    database: Database
) : StandardRepository<ConfigurationEntry, ConfigurationEntries>(ConfigurationEntries, database) {

    fun findFirstByKey(key: ConfigurationKey): ConfigurationEntry? {
        return database
            .from(table)
            .select()
            .where(table.key eq key)
            .limit(1)
            .map { row -> table.createEntity(row) }
            .firstOrNull()
    }
}

