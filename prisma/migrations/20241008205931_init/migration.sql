-- CreateTable
CREATE TABLE "Tenant" (
    "TenantID" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "InformacoesDeContato" TEXT NOT NULL,
    "ConfiguracoesEspecificas" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("TenantID")
);

-- CreateTable
CREATE TABLE "Sample" (
    "SampleID" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("SampleID")
);
