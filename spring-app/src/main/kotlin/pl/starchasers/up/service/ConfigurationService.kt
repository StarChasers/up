package pl.starchasers.up.service

import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Service
import pl.starchasers.up.data.model.ConfigurationEntry
import pl.starchasers.up.data.model.ConfigurationKey
import pl.starchasers.up.exception.BadRequestException
import pl.starchasers.up.repository.ConfigurationRepository

interface ConfigurationService {
    fun setConfigurationOption(key: ConfigurationKey, value: String)

    fun getConfigurationOption(key: ConfigurationKey): String

    fun getGlobalConfiguration(): Map<ConfigurationKey, String>

    fun updateGlobalConfiguration(configuration: Map<ConfigurationKey, String>)

    fun getAnonymousMaxFileSize(): Long

    fun getAnonymousDefaultFileLifetime(): Long

    fun getAnonymousMaxFileLifetime(): Long
}

@Service
class ConfigurationServiceImpl(
    private val configurationRepository: ConfigurationRepository
) : ConfigurationService {

    override fun setConfigurationOption(key: ConfigurationKey, value: String) {
        if (value.toLongOrNull() == null) throw BadRequestException("Value must be of type Long.") // TODO change if more data types are required
        configurationRepository.findFirstByKey(key)?.apply { this.value = value }?.flushChanges()
            ?: configurationRepository.insert(ConfigurationEntry { this.key = key; this.value = value })
    }

    override fun getConfigurationOption(key: ConfigurationKey): String {
        return configurationRepository.findFirstByKey(key)?.value ?: key.defaultValue
    }

    override fun getGlobalConfiguration(): Map<ConfigurationKey, String> =
        mapOf(
            *ConfigurationKey.entries.map {
                Pair(it, configurationRepository.findFirstByKey(it)?.value ?: it.defaultValue)
            }.toTypedArray()
        )

    override fun updateGlobalConfiguration(configuration: Map<ConfigurationKey, String>) {
        if (configuration.values.any { it.toLongOrNull() == null }) throw BadRequestException("Value must be of type Long.") // TODO change if more data types are required

        configuration.forEach { setConfigurationOption(it.key, it.value) }
    }

    override fun getAnonymousMaxFileSize(): Long =
        getConfigurationOption(ConfigurationKey.ANONYMOUS_MAX_FILE_SIZE).toLong()

    override fun getAnonymousDefaultFileLifetime(): Long =
        getConfigurationOption(ConfigurationKey.ANONYMOUS_DEFAULT_FILE_LIFETIME).toLong()

    override fun getAnonymousMaxFileLifetime(): Long =
        getConfigurationOption(ConfigurationKey.ANONYMOUS_MAX_FILE_LIFETIME).toLong()

    @PostConstruct
    private fun initialize() {
        ConfigurationKey.entries.forEach { key ->
            val entry = configurationRepository.findFirstByKey(key)

            if (entry == null) {
                val defaultEntry = ConfigurationEntry { this.key = key; this.value = key.defaultValue }
                configurationRepository.insert(defaultEntry)
            }
        }
    }
}
