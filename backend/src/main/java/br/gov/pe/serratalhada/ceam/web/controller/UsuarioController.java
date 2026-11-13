package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.service.UsuarioService;
import br.gov.pe.serratalhada.ceam.web.dto.AlterarSenhaRequest;
import br.gov.pe.serratalhada.ceam.web.dto.UsuarioResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping   // restrito a ADMIN no SecurityConfig
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @PutMapping("/{id}/alterar-senha")
    public ResponseEntity<Void> alterarSenha(
            @PathVariable UUID id,
            @RequestBody @Valid AlterarSenhaRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        // cada usuário só altera a própria senha
        if (!id.toString().equals(jwt.getSubject())) {
            throw new AccessDeniedException("Só é possível alterar a própria senha.");
        }
        usuarioService.alterarSenha(id, request);
        return ResponseEntity.noContent().build();
    }
}
