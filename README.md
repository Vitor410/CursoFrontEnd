### Diagrama de Fluxo de Arquitetura de Projeto
```mermaid
graph TD
    subgraph Cliente["Navegador"]
        UI
    end

    subgraph Front["React"]
        FrontEnd
    end

    subgraph Back["API"]
        BackEnd
    end

    subgraph Banco["MongoDB"]
        BD
    end

    %% FLUXO

    UI-->FrontEnd
    FrontEnd-->BackEnd
    BackEnd-->BD
    BD-->BackEnd
    BackEnd-->FrontEnd
    FrontEnd-->UI


```