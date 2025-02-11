package pl.starchasers.up.repository

import org.ktorm.dsl.Query
import org.ktorm.dsl.QueryRowSet
import org.ktorm.dsl.asIterable

data class QueryResultContainer<T>(
    val result: List<T>,
    val totalRecords: Int
)

fun <T> Query.transform(how: Iterable<QueryRowSet>.() -> List<T>) =
    QueryResultContainer(
        how.invoke(this.asIterable()),
        this.totalRecordsInAllPages
    )
