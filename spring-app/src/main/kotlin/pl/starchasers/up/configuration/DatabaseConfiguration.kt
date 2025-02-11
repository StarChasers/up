package pl.starchasers.up.configuration

import org.ktorm.database.Database
import org.ktorm.logging.Slf4jLoggerAdapter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource
import kotlin.reflect.jvm.jvmName

@Configuration
class DatabaseConfiguration(
    private val dataSource: DataSource
) {

    @Bean
    fun database(): Database = Database.connect(
        dataSource = dataSource,
        alwaysQuoteIdentifiers = true,
        logger = Slf4jLoggerAdapter(this::class.jvmName)
    )

}
