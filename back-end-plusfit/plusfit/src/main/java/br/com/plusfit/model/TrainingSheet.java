package br.com.plusfit.model;

import br.com.plusfit.controller.request.ActivityRequestDto;
import br.com.plusfit.controller.request.TrainingSheetRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "training_sheet")
public class TrainingSheet {

    @Id
    @Column(name="idt_training_sheet")
    @GeneratedValue(generator = "TRAINING_SHEET_SEQUENCE")
    @SequenceGenerator(name = "TRAINING_SHEET_SEQUENCE", sequenceName = "TRAINING_SHEET_SEQUENCE", allocationSize = 1)
    private Long trainingSheetId;

    @OneToOne
    @JoinColumn(name="idt_customer")
    private Customer customer;

    @Column(name="des_name")
    private String name;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    @OneToMany(mappedBy = "trainingSheet",
    cascade = CascadeType.ALL)
    private List<Activity> activity;

    public TrainingSheet(final TrainingSheetRequestDto trainingSheetRequestDto, Customer customer) {
        this.customer = customer;
        this.name = trainingSheetRequestDto.getName();
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;

        this.activity = new ArrayList<>();
        for (final ActivityRequestDto activityRequestDto: trainingSheetRequestDto.getActivity()) {
            this.activity.add(new Activity(activityRequestDto, this));
        }
    }
}
