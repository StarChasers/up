package pl.starchasers.up

import org.junit.jupiter.api.extension.BeforeTestExecutionCallback
import org.junit.jupiter.api.extension.ExtensionContext
import org.ktorm.database.Database
import org.springframework.stereotype.Component
import pl.starchasers.up.repository.StandardRepository
import pl.starchasers.up.util.initializer.Initializer

@Component
class DatabaseCleaner(
    private val database: Database,
    private val repositories: List<StandardRepository<*, *>>,
    private val initializers: List<Initializer>
) : BeforeTestExecutionCallback {

    fun reset() {
        clean()
        initialize()
    }

    private fun clean() {
        database.useTransaction {
            repositories.forEach {
                it.deleteAll()
            }
        }
    }

    private fun initialize() {
        initializers.forEach { it.initialize() }
    }

    override fun beforeTestExecution(context: ExtensionContext?) {
        clean()
        initialize()
    }
}
