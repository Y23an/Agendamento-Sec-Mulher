package br.gov.pe.serratalhada.ceam.web.dto;

import jakarta.validation.constraints.NotBlank;

public record DominioRequest(
    @NotBlank String descricao, 
    Boolean ativo
) {
    public Boolean ativoOuPadrao() {
        return ativo != null ? ativo : true;
    }
}
