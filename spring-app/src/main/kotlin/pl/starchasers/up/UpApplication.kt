package pl.starchasers.up

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.transaction.annotation.EnableTransactionManagement

@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
@ConfigurationPropertiesScan
class UpApplication

fun main(args: Array<String>) {
    runApplication<UpApplication>(*args)
}
