package br.com.plusfit.controller.response;

import br.com.plusfit.model.Enrollment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnrollmentResponseDto {

    private Long enrollmentId;
    private String planDescription;
    private String status;

    public EnrollmentResponseDto (final Enrollment enrollment) {
        this.enrollmentId = enrollment.getEnrollmentId();
        this.planDescription = enrollment.getPlanDescription();
        this.status = enrollment.getStatus().description;
    }
}
