package br.com.plusfit.controller.response;


import br.com.plusfit.model.Activity;
import br.com.plusfit.model.TrainingSheet;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrainingSheetResponseDto {

    private Long trainingSheetId;
    private String name;
    private Boolean active;
    private List<ActivityResponseDto> activity;

    public TrainingSheetResponseDto (final TrainingSheet trainingSheet) {
        this.trainingSheetId = trainingSheet.getTrainingSheetId();
        this.name = trainingSheet.getName();
        this.active = trainingSheet.getActive();
        this.activity = new ArrayList<>();

        for(Activity activity: trainingSheet.getActivity()) {
            this.activity.add(new ActivityResponseDto(activity));
        }
    }
}
