package pl.starchasers.up

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.*

object DefaultObjectMapper {
    val objectMapper: ObjectMapper = jacksonObjectMapper().registerModule(JavaTimeModule())
}

var MockHttpServletRequestDsl.jsonContent: Any?
    get() = null
    set(value) {
        content = DefaultObjectMapper.objectMapper.writeValueAsString(value)
    }

inline fun <reified T> MvcResult.parse(): T =
    DefaultObjectMapper.objectMapper.readValue(this.response.contentAsString)

fun MockMvc.patchJson(urlTemplate: String, vararg vars: Any?, dsl: MockHttpServletRequestDsl.() -> Unit) =
    patch(urlTemplate, *vars) {
        contentType = MediaType.APPLICATION_JSON
        accept = MediaType.APPLICATION_JSON
        dsl()
    }

fun MockMvc.postJson(urlTemplate: String, vararg vars: Any?, dsl: MockHttpServletRequestDsl.() -> Unit) =
    post(urlTemplate, *vars) {
        contentType = MediaType.APPLICATION_JSON
        accept = MediaType.APPLICATION_JSON
        dsl()
    }

fun MockMvc.deleteJson(urlTemplate: String, vararg vars: Any?, dsl: MockHttpServletRequestDsl.() -> Unit) =
    delete(urlTemplate, *vars) {
        contentType = MediaType.APPLICATION_JSON
        accept = MediaType.APPLICATION_JSON
        dsl()
    }
