package br.com.plusfit.controller;

import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.request.TrainingSheetRequestDto;
import br.com.plusfit.controller.response.CustomerResponseDto;
import br.com.plusfit.controller.response.TrainingSheetResponseDto;
import br.com.plusfit.model.TrainingSheet;
import br.com.plusfit.service.TrainingSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("trainingSheet")
public class TrainingSheetController {

    @Autowired
    private TrainingSheetService trainingSheetService;

    @GetMapping
    private List<TrainingSheetResponseDto> getTrainingSheet() {
        List<TrainingSheetResponseDto> response = new ArrayList<>();
        for (TrainingSheet trainingSheet : this.trainingSheetService.findAll()) {
            response.add(new TrainingSheetResponseDto(trainingSheet));
        }
        return response;
    }

    @GetMapping("{trainingSheetId}")
    public TrainingSheetResponseDto getById(@PathVariable Long trainingSheetId) {
        TrainingSheet trainingSheet = this.trainingSheetService.findById(trainingSheetId);
        return new TrainingSheetResponseDto(trainingSheet);
    }

    @PostMapping("customer/{customerId}")
    public TrainingSheetResponseDto saveTrainingSheet(@RequestBody final TrainingSheetRequestDto trainingSheetRequestDto, @PathVariable Long customerId) {
        TrainingSheet trainingSheet = this.trainingSheetService.save(trainingSheetRequestDto, customerId);
        return new TrainingSheetResponseDto(trainingSheet);
    }

    @PutMapping("/{trainingSheetId}")
    public TrainingSheetResponseDto updateTrainingSheet(@RequestBody final TrainingSheetRequestDto trainingSheetRequestDto, @PathVariable Long trainingSheetId) {
        return new TrainingSheetResponseDto(this.trainingSheetService.update(trainingSheetRequestDto, trainingSheetId));
    }

    @DeleteMapping("/{trainingSheetId}")
    public void inactiveTrainingSheet(@PathVariable final Long trainingSheetId) {
        trainingSheetService.inactive(trainingSheetId);
    }
}
