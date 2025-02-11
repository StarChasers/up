package pl.starchasers.up.repository

import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.springframework.stereotype.Service
import pl.starchasers.up.data.model.FileEntries
import pl.starchasers.up.data.model.FileEntry
import java.time.Instant

@Service
class FileEntryRepository(
    database: Database
) : StandardRepository<FileEntry, FileEntries>(FileEntries, database) {

    fun findExistingFileByKey(key: String): FileEntry? =
        database.from(table)
            .select()
            .where { table.key eq key }
            .map { table.createEntity(it) }
            .firstOrNull()

    fun findExpiredFiles(): Set<FileEntry> =
        database.from(table)
            .select()
            .where { table.deleteAt.isNotNull() and table.deleteAt.less(Instant.now()) }
            .map { table.createEntity(it) }
            .toSet()

}
