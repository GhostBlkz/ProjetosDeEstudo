package br.com.plusfit.model;

import br.com.plusfit.controller.request.EnrollmentRequestDto;
import br.com.plusfit.model.enums.EnrollmentStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "enrollment")
@NoArgsConstructor
public class Enrollment {

    @Id
    @Column(name = "idt_enrollment")
    @GeneratedValue(generator = "ENROLLMENT_SEQUENCE")
    @SequenceGenerator(name = "ENROLLMENT_SEQUENCE", sequenceName = "ENROLLMENT_SEQUENCE", allocationSize = 1)
    private Long enrollmentId;

    @OneToOne
    @JoinColumn(name="idt_customer")
    private Customer customer;

    @Column(name = "des_plan_type")
    private String planDescription;

    @Column(name = "ind_status")
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    public Enrollment (final EnrollmentRequestDto enrollmentRequestDto, Customer customer) {
        this.enrollmentId = enrollmentRequestDto.getEnrollmentId();
        this.customer = customer;
        this.planDescription = enrollmentRequestDto.getPlanDescription();
        this.status = EnrollmentStatus.getByString(enrollmentRequestDto.getStatus());
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;
    }
}
