import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.asciidoctor.jvm.convert") version "3.2.0"
    id("org.flywaydb.flyway") version "7.5.2"
    id("org.jlleitschuh.gradle.ktlint") version "12.1.2"

    kotlin("jvm") version "2.1.0"
    kotlin("plugin.spring") version "2.1.0"
    kotlin("plugin.jpa") version "2.1.0"
    kotlin("kapt") version "2.1.0"
}

group = "pl.starchasers"
version = "2.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("commons-fileupload:commons-fileupload:1.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-gson:0.11.5")
    implementation("org.flywaydb:flyway-core:9.10.2")
    implementation("org.flywaydb:flyway-mysql:9.10.2")
    implementation("ch.vorburger.mariaDB4j:mariaDB4j:2.4.0")
    implementation("com.ibm.icu:icu4j:72.1")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")
    implementation("com.github.therapi:therapi-runtime-javadoc:0.15.0")
    kapt("com.github.therapi:therapi-runtime-javadoc-scribe:0.15.0")
    runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
    runtimeOnly(files("../next-app/next-app.jar"))

    runtimeOnly("org.postgresql:postgresql:42.7.5")

    testImplementation("org.postgresql:postgresql:42.7.5")
    testImplementation("org.testcontainers:postgresql:1.20.4")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("io.kotest:kotest-assertions-core:5.5.4")
}

kotlin {
    compilerOptions {
        jvmTarget = JvmTarget.JVM_17
        freeCompilerArgs = listOf("-Xjsr305=strict", "-Xemit-jvm-type-annotations")
    }
}

val snippetsDir = file("build/generated-snippets")

ext {
    set("snippetsDir", snippetsDir)
}

ktlint {
    version.set("1.4.1")
    ignoreFailures.set(true)
    disabledRules.set(setOf("no-wildcard-imports"))
}

tasks {

    withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
        archiveFileName.set("up.jar")
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
