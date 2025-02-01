package pl.starchasers.up.data.model

import jakarta.persistence.*
import pl.starchasers.up.data.value.*
import pl.starchasers.up.security.Role

@Entity(name = "application_user")
class User(
    @Id
    @Column(nullable = false, updatable = false, name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Embedded
    var username: Username,

    @Embedded
    var password: UserPassword,

    @Embedded
    var email: Email?,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = false)
    var role: Role,

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "maxTemporaryFileSize"))
    var maxTemporaryFileSize: FileSize = FileSize(0),

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "maxPermanentFileSize"))
    var maxPermanentFileSize: FileSize = FileSize(0),

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "defaultFileLifetime"))
    var defaultFileLifetime: Milliseconds = Milliseconds(0),

    @Embedded
    @AttributeOverride(name = "value", column = Column(name = "maxFileLifetime"))
    var maxFileLifetime: Milliseconds = Milliseconds(0),

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
    val files: MutableSet<FileEntry> = mutableSetOf()
)
