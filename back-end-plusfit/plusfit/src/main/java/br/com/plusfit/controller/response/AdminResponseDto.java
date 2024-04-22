package br.com.plusfit.controller.response;

import br.com.plusfit.model.Admin;
import br.com.plusfit.model.Customer;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminResponseDto {

    private Long adminId;
    private String userName;
    private String email;
    private String passWord;

    public AdminResponseDto(final Admin admin) {
        this.adminId = admin.getAdminId();
        this.userName = admin.getUserName();
        this.email = admin.getEmail();
        this.passWord = admin.getPassWord();
    }
}
