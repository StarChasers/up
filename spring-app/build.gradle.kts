import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.4.2"
    id("io.spring.dependency-management") version "1.0.9.RELEASE"
    id("org.asciidoctor.jvm.convert") version "3.1.0"
    id("org.jetbrains.dokka") version "0.9.18"
    id("org.flywaydb.flyway") version "7.5.2"
    id("org.jlleitschuh.gradle.ktlint") version "9.4.1"

    kotlin("jvm") version "1.4.21"
    kotlin("plugin.spring") version "1.4.21"
    kotlin("plugin.jpa") version "1.4.21"
}

group = "pl.starchasers"
version = "1.1"
java.sourceCompatibility = JavaVersion.VERSION_11

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
    implementation("commons-fileupload:commons-fileupload:1.3.3")
    implementation("io.jsonwebtoken:jjwt:0.9.1")
    implementation("org.flywaydb:flyway-core:7.5.2")
    implementation("ch.vorburger.mariaDB4j:mariaDB4j:2.4.0")
    implementation("com.ibm.icu:icu4j:67.1")
    runtimeOnly("com.h2database:h2:1.4.200")
    runtimeOnly("mysql:mysql-connector-java")
    runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
    runtimeOnly(files("../next-app/next-app.jar"))

    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("no.skatteetaten.aurora:mockmvc-extensions-kotlin:1.1.6")
    testImplementation("org.springframework.restdocs:spring-restdocs-mockmvc")
    testImplementation("capital.scalable:spring-auto-restdocs-core:2.0.9")

    testImplementation("org.springframework.restdocs:spring-restdocs-asciidoctor")
    testImplementation("capital.scalable:spring-auto-restdocs-json-doclet-jdk9:2.0.9")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict", "-Xemit-jvm-type-annotations")
        jvmTarget = "11"
    }
}

val snippetsDir = file("build/generated-snippets")

ext {
    set("snippetsDir", snippetsDir)
    set("javadocJsonDir", file("$buildDir/generated-javadoc-json"))
}

ktlint {
    disabledRules.set(setOf("no-wildcard-imports"))
}

tasks {
    val dokka by getting(org.jetbrains.dokka.gradle.DokkaTask::class) {
        outputDirectory = file("$buildDir/generated-javadoc-json").toString()
        outputFormat = "auto-restdocs-json"
        includeNonPublic = true
        dokkaFatJar = "capital.scalable:spring-auto-restdocs-dokka-json:2.0.7"
    }

    asciidoctor {
        inputs.dir(snippetsDir)
        setOutputDir(file("$buildDir/generated-docs"))

        options["backend"] = "html"
        options["doctype"] = "book"

        attributes["source-highlighter"] = "highlightjs"
        attributes["snippets"] = snippetsDir

        dependsOn(test)
        dependsOn(dokka)
    }
    jar {
        dependsOn(asciidoctor)
    }

    withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
        archiveBaseName.set("up")
    }

    test {
        useJUnitPlatform()
        dependsOn(dokka)
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
