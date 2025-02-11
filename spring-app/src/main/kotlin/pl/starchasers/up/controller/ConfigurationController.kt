package pl.starchasers.up.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import pl.starchasers.up.data.dto.configuration.UserConfigurationDTO
import pl.starchasers.up.service.ConfigurationService

@RestController
class ConfigurationController(
    private val configurationService: ConfigurationService
) {

    /**
     * Returns configuration for anonymous or logged in user, if Authorization header is provided
     */
    @GetMapping("/api/configuration")
    fun getConfiguration(): UserConfigurationDTO {
        return UserConfigurationDTO(
            configurationService.getAnonymousMaxFileSize(),
            configurationService.getAnonymousMaxFileLifetime(),
            configurationService.getAnonymousDefaultFileLifetime(),
            configurationService.getAnonymousDefaultFileLifetime() == 0L,
            if (configurationService.getAnonymousMaxFileLifetime() == 0L) {
                configurationService.getAnonymousMaxFileSize()
            } else 0
        )
    }
}
