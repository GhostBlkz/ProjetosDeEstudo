package br.com.plusfit.controller.request;

import br.com.plusfit.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class TrainingSheetRequestDto {

    private Customer customer;
    private String name;
    private List<ActivityRequestDto> activity;

    public TrainingSheetRequestDto(final TrainingSheet trainingSheet, Customer customer) {
        this.customer = customer;
        this.name = trainingSheet.getName();

        for(Activity activity: trainingSheet.getActivity()) {
            this.activity.add(new ActivityRequestDto(activity));
        }
    }
}
