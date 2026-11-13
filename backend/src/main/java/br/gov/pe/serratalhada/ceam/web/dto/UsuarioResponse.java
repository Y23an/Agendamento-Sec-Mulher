package br.gov.pe.serratalhada.ceam.web.dto;

import br.gov.pe.serratalhada.ceam.domain.enums.RoleUsuario;
import java.util.UUID;

public record UsuarioResponse(
    UUID id,
    String nome,
    String email,
    RoleUsuario role,
    String cargo,
    String telefone,
    Boolean ativo
) {}
