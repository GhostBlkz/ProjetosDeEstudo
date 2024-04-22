package br.com.plusfit.controller.request;

import br.com.plusfit.model.Enrollment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnrollmentRequestDto {

    private Long enrollmentId;
    private String planDescription;
    private String status;

    public EnrollmentRequestDto (final Enrollment enrollment) {
        this.enrollmentId = enrollment.getEnrollmentId();
        this.planDescription = enrollment.getPlanDescription();
        this.status = enrollment.getStatus().description;
    }
}
