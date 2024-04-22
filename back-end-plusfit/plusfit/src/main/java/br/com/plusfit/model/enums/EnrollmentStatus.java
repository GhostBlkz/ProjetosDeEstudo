package br.com.plusfit.model.enums;

public enum EnrollmentStatus {
    I("INACTIVE"),
    A("ACTIVE"),
    S("SUSPENDED"),
    C("CANCELLED");

    public final String description;

    EnrollmentStatus(String description) {                // construtor do enum
        this.description = description;
    }

    public static EnrollmentStatus getByString(final String enrollmentStatus) {

        return switch (enrollmentStatus) {
            case "INACTIVE" -> EnrollmentStatus.I;
            case "SUSPENDED" -> EnrollmentStatus.S;
            case "CANCELLED" -> EnrollmentStatus.C;
            case "ACTIVE" -> EnrollmentStatus.A;
            default -> throw new RuntimeException();
        };
    }
}
