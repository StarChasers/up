package pl.starchasers.up.util

class SetCookieHeaderValueBuilder {

    private var builder: StringBuilder = StringBuilder()

    fun withName(name: String): SetCookieHeaderValueBuilder {
        builder.append(name)
        return this
    }

    fun withValue(value: String): SetCookieHeaderValueBuilder {
        builder.append("=").append(value)
        return this
    }

    fun withMaxAge(seconds: Number): SetCookieHeaderValueBuilder {
        builder.append("; ").append("Max-Age=").append(seconds)
        return this
    }

    fun withPath(path: String): SetCookieHeaderValueBuilder {
        builder.append("; ").append("Path=").append(path)
        return this
    }

    fun httpOnly(): SetCookieHeaderValueBuilder {
        builder.append("; ").append("HttpOnly")
        return this
    }

    fun build(): String {
        if (builder.isEmpty()) throw IllegalStateException("Cookie can't b empty")
        return builder.toString()
    }
}
