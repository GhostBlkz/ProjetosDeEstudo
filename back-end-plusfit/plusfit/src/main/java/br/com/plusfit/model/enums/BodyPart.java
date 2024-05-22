package br.com.plusfit.model.enums;

public enum BodyPart {

    P("PEITO"),
    C("COSTAS"),
    O("OMBROS"),
    T("TRICEPS"),
    B("BICEPS"),
    E("PERNAS"),
    G("GLUTEOS"),
    A("ABDOMEN");

    public final String description;

    BodyPart(String description) {                // construtor do enum
        this.description = description;
    }

    public static BodyPart getByString(final String activityBodyPart) {

        return switch (activityBodyPart) {
            case "PEITO" -> BodyPart.P;
            case "COSTAS" -> BodyPart.C;
            case "OMBROS" -> BodyPart.O;
            case "TRICEPS" -> BodyPart.T;
            case "BICEPS" -> BodyPart.B;
            case "PERNAS" -> BodyPart.E;
            case "GLUTEOS" -> BodyPart.G;
            case "ABDOMEN" -> BodyPart.A;
            default -> throw new RuntimeException();
        };
    }


}
