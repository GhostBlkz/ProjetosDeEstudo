package br.com.plusfit.model.enums;

public enum Gender {
    F("Female"),
    M("Male"),
    O("Other");

    public final String description;

    Gender(String description) {                // construtor do enum
        this.description = description;
    }

    public static Gender getByString(final String gender) {

        return switch (gender) {
            case "Female" -> Gender.F;
            case "Male" -> Gender.M;
            case "Other" -> Gender.O;
            default -> throw new RuntimeException();
        };
    }
}
