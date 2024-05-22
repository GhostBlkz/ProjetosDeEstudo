package br.com.plusfit.controller.response;

import br.com.plusfit.model.Activity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActivityResponseDto {

    private Long activityId;
    private String group;
    private String bodyPart;
    private Boolean active;
    private String description;

    public ActivityResponseDto (final Activity activity) {
        this.activityId = activity.getActivityId();
        this.group = activity.getGroup();
        this.bodyPart = activity.getBodyPart().description;
        this.active = activity.getActive();
        this.description = activity.getDescription();
    }
}
