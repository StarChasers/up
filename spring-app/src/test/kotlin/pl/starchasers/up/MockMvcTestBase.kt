package pl.starchasers.up

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
abstract class MockMvcTestBase {
    @Autowired
    protected lateinit var mockMvc: MockMvc

}
