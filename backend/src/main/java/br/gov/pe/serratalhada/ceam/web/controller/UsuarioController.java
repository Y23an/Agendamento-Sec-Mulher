package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.service.UsuarioService;
import br.gov.pe.serratalhada.ceam.web.dto.AlterarSenhaRequest;
import br.gov.pe.serratalhada.ceam.web.dto.UsuarioResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @PutMapping("/{id}/alterar-senha")
    public ResponseEntity<Void> alterarSenha(
            @PathVariable UUID id,
            @RequestBody @Valid AlterarSenhaRequest request
    ) {
        usuarioService.alterarSenha(id, request);
        return ResponseEntity.noContent().build();
    }
}
