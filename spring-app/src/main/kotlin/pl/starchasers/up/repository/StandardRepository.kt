package pl.starchasers.up.repository

import jakarta.persistence.EntityNotFoundException
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.entity.*
import org.ktorm.schema.ColumnDeclaring
import org.ktorm.schema.Table
import org.ktorm.support.postgresql.BulkInsertStatementBuilder
import org.ktorm.support.postgresql.bulkInsert
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable

open class StandardRepository<E : Entity<E>, T : Table<E>>(
    internal open val table: T,
    open val database: Database
) {

    private val logger: Logger = LoggerFactory.getLogger(this::class.java)

    fun update(record: E): E =
        database
            .sequenceOf(table)
            .update(record)
            .let {
                if (it == 0) throw EntityNotFoundException()
                record
            }

    fun insert(record: E) =
        database
            .sequenceOf(table)
            .add(record)
            .let {
                // Not safe, WILL CRASH if entity doesn't have column "id" of type Long
                record["id"] as Long
            }

    /**
     * Slower version, see [bulkInsert] for faster version
     */
    fun saveAll(records: Iterable<E>) =
        database
            .sequenceOf(table)
            .let { sequence ->
                records.map { record ->
                    sequence.add(record)
                }
            }

    fun bulkInsert(records: BulkInsertStatementBuilder<T>.(T) -> Unit) =
        database.bulkInsert(table, records)

    fun deleteAll(): Int {
        logger.warn("Deleting everything from ${table.tableName}")
        return database.deleteAll(table)
    }

    fun findByPredicate(predicate: () -> ColumnDeclaring<Boolean>): List<E> =
        findByPredicate(predicate.invoke())

    fun deleteByPredicate(predicate: (T) -> ColumnDeclaring<Boolean>): Int =
        database.delete(table, predicate).let {
            if (it == 0) throw EntityNotFoundException()
            logger.warn("Deleted $it rows")
            return it
        }

    fun findAll() = database.from(table).select().map { table.createEntity(it) }

    fun findByPredicate(predicate: ColumnDeclaring<Boolean>): List<E> =
        database.from(table).select().where(predicate).map { table.createEntity(it) }

    fun findAll(pageable: Pageable): Page<E> =
        database.from(table)
            .select()
            .limit(pageable.pageSize)
            .offset(pageable.offset.toInt())
            .map { table.createEntity(it) }
            .let {
                PageImpl<E>(it, pageable, it.size.toLong())
            }

    fun count(): Int = database.sequenceOf(table).count()

}

