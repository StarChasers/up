import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.0.1"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.asciidoctor.jvm.convert") version "3.1.0"
    id("org.flywaydb.flyway") version "7.5.2"
    id("org.jlleitschuh.gradle.ktlint") version "11.0.0"

    kotlin("jvm") version "1.7.21"
    kotlin("plugin.spring") version "1.7.21"
    kotlin("plugin.jpa") version "1.7.21"
    kotlin("kapt") version "1.7.21"
}

group = "pl.starchasers"
version = "1.2"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("commons-fileupload:commons-fileupload:1.4")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-gson:0.11.5")
    implementation("org.flywaydb:flyway-core:9.10.2")
    implementation("ch.vorburger.mariaDB4j:mariaDB4j:2.4.0")
    implementation("com.ibm.icu:icu4j:72.1")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")
    implementation("com.github.therapi:therapi-runtime-javadoc:0.15.0")
    kapt("com.github.therapi:therapi-runtime-javadoc-scribe:0.15.0")
    runtimeOnly("com.h2database:h2:1.4.200")
    runtimeOnly("mysql:mysql-connector-java")
    runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
    runtimeOnly(files("../next-app/next-app.jar"))

    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("io.kotest:kotest-assertions-core:5.5.4")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict", "-Xemit-jvm-type-annotations")
        jvmTarget = "17"
    }
}

val snippetsDir = file("build/generated-snippets")

ext {
    set("snippetsDir", snippetsDir)
}

ktlint {
    disabledRules.set(setOf("no-wildcard-imports"))
}

tasks {

    withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
        archiveBaseName.set("up")
    }

    test {
        useJUnitPlatform()

        doFirst {
            environment("spring.profiles.active", "junit")
        }

        finalizedBy(ktlintCheck)
    }

    register("bootRunDev") {
        group = "Application"
        doFirst {
            bootRun.configure {
                args("--spring.profiles.active=localdb")
            }
        }
        finalizedBy("bootRun")
    }
}
