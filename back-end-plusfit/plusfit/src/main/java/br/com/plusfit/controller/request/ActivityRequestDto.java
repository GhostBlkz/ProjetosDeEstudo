package br.com.plusfit.controller.request;

import br.com.plusfit.model.Activity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActivityRequestDto {

    private Long activityId;
    private String description;
    private String group;
    private String bodyPart;

    public ActivityRequestDto (Activity activity) {
        this.description = activity.getDescription();
        this.group = activity.getGroup();
        this.bodyPart = activity.getBodyPart().description;
    }

}
