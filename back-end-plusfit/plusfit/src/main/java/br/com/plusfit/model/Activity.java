package br.com.plusfit.model;

import br.com.plusfit.controller.request.ActivityRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import br.com.plusfit.model.enums.BodyPart;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "activity")
@NoArgsConstructor
public class Activity {

    @Id
    @Column(name = "idt_activity")
    @GeneratedValue(generator = "ACTIVITY_SEQUENCE")
    @SequenceGenerator(name = "ACTIVITY_SEQUENCE", sequenceName = "ACTIVITY_SEQUENCE", allocationSize = 1)
    private Long activityId;

    @OneToOne
    @JoinColumn(name="idt_training_sheet")
    private TrainingSheet trainingSheet;

    @Column(name="des_description")
    private String description;

    @Column(name="ind_body_part")
    @Enumerated(EnumType.STRING)
    private BodyPart bodyPart;

    @Column(name="des_group")
    private String group;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    public Activity (final ActivityRequestDto activityRequestDto, TrainingSheet trainingSheet) {
        this.trainingSheet = trainingSheet;
        this.description = activityRequestDto.getDescription();
        this.group = activityRequestDto.getGroup();
        this.bodyPart = BodyPart.getByString(activityRequestDto.getBodyPart());
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;
    }
}
