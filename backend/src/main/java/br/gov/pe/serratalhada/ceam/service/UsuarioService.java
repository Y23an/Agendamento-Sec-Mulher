package br.gov.pe.serratalhada.ceam.service;

import br.gov.pe.serratalhada.ceam.domain.entity.Usuario;
import br.gov.pe.serratalhada.ceam.repository.UsuarioRepository;
import br.gov.pe.serratalhada.ceam.web.dto.AlterarSenhaRequest;
import br.gov.pe.serratalhada.ceam.web.dto.UsuarioResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void alterarSenha(UUID usuarioId, AlterarSenhaRequest request) {
        if (!request.novaSenha().equals(request.confirmarSenha())) {
            throw new IllegalArgumentException("A nova senha e a confirmação não coincidem.");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        if (!usuario.getSenha().equals(request.senhaAtual())) {
            throw new IllegalArgumentException("Senha atual incorreta.");
        }

        usuario.setSenha(request.novaSenha());
        usuarioRepository.save(usuario);
    }

    private UsuarioResponse toResponse(Usuario u) {
        return new UsuarioResponse(
                u.getId(),
                u.getNome(),
                u.getEmail(),
                u.getRole(),
                u.getCargo(),
                u.getTelefone(),
                u.getAtivo()
        );
    }
}
