package pl.starchasers.up

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.testcontainers.containers.PostgreSQLContainer
import javax.sql.DataSource

@Configuration
class PostgresContainerConfiguration {

    @Bean
    fun dataSource(): DataSource  {
        val ds = DriverManagerDataSource()
        MyPostgresContainer.instance.start()
        ds.setDriverClassName(MyPostgresContainer.instance.driverClassName)
        ds.url = MyPostgresContainer.instance.jdbcUrl
        ds.username = MyPostgresContainer.instance.username
        ds.password = MyPostgresContainer.instance.password
        return ds
    }

}

@Configuration
class MyPostgresContainer : PostgreSQLContainer<MyPostgresContainer>(IMAGE) {

    companion object {
        private const val IMAGE = "postgres:17"
        val instance by lazy { MyPostgresContainer() }
    }

    override fun start() {
        super.start()
        System.setProperty("DATASOURCE_URL", this.jdbcUrl)
        System.setProperty("DATASOURCE_USERNAME", this.username)
        System.setProperty("DATASOURCE_PASSWORD", this.password)
    }

}
