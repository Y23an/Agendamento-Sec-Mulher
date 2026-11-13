package br.gov.pe.serratalhada.ceam.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipos_atendimento")
public class TipoAtendimento extends DominioBase {
    public TipoAtendimento() {
        super();
    }

    public TipoAtendimento(String descricao, Boolean ativo) {
        super();
        setDescricao(descricao);
        setAtivo(ativo);
    }
}
