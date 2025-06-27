import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // test.setTimeout(120000);
  test.setTimeout(300000);
  await page.goto("http://localhost:5173/login");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mahasiswa1@example.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(6000);
  await page.goto(
    "http://localhost:5173/praktikum/1/sistem/1/e-faktur/pajak-keluaran/?viewAs=2"
  );
  await page.getByRole("button", { name: "Tambah" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Dokumen Transaksi$/ })
    .click();
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^Uang Muka$/ })
  //   .click({
  //     button: "right",
  //   });
  await page.locator('input[name="uangMuka"]').check();
  await page.locator('select[name="kode_transaksi"]').selectOption("10");
  await page.locator('input[name="tanggal_faktur_pajak"]').fill("2025-06-20");
  await page.getByRole("button", { name: "2025" }).click();
  await page.locator('select[name="masa_pajak"]').selectOption("Desember");
  await page
    .locator("div")
    .filter({ hasText: /^Informasi Pembeli$/ })
    .click();
  await page.locator('select[name="akun_penerima_id"]').selectOption("5");
  await page
    .locator("div")
    .filter({ hasText: /^NPWP$/ })
    .getByRole("radio")
    .check();
  await page
    .locator("div")
    .filter({ hasText: /^Detail Transaksi$/ })
    .click();

  // Repeat the transaction addition 20 times
  // for (let i = 0; i < 20; i++) {
  //   await page.getByRole("button", { name: "Tambah Transaksi" }).click();
  //   await page.waitForTimeout(1000);
  //   // await page.getByText("Barang").click();
  //   // await page.getByText("Barang").nth(1).click();
  //   // await page.getByRole("button", { name: "Tambah Transaksi" }).click();
  //   await page.waitForTimeout(1000);

  //   // Check for "Barang" or alternative elements
  //   // const barangElement = page.getByText("Barang");
  //   // const alternativeElement = page.getByText("Barang").nth(1); // replace with your alternative

  //   // if (await barangElement.isVisible()) {
  //   //   await barangElement.click();
  //   // } else if (await alternativeElement.isVisible()) {
  //   //   await alternativeElement.click();
  //   // }
  //   // await page.getByText("Barang").click({ timeout: 5000 });
  //   try {
  //     await page.getByText("Barang").click({ timeout: 5000 });
  //   } catch (error) {
  //     if (error.message.includes("strict mode violation")) {
  //       // Use the specific locator from the dialog when multiple elements exist
  //       await page.getByLabel("Tambah Transaksi").getByText("Barang").click();
  //     } else {
  //       throw error; // Re-throw if it's a different error
  //     }
  //   }
  //   // try {
  //   //   await page.getByText("Barang").click({ timeout: 5000 });
  //   // } catch (error) {
  //   //   if (error.message.includes("strict mode violation")) {
  //   //     // Use the specific locator from the dialog when multiple elements exist
  //   //     // await page.getByLabel("Tambah Transaksi").getByText("Barang").click();
  //   //     await page.waitForTimeout(500);
  //   //     await page.getByText("Barang").nth(1).click();
  //   //   } else {
  //   //     throw error; // Re-throw if it's a different error
  //   //   }
  //   // }

  //   await page.waitForTimeout(2000);
  //   await page.locator(".css-19bb58m").click();
  //   await page
  //     .getByRole("option", { name: "010100 - Kuda, keledai, bagal" })
  //     .click();
  //   await page.waitForTimeout(500);
  //   await page
  //     .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
  //     .click();
  //   await page.waitForTimeout(500);
  //   await page
  //     .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
  //     .click();
  //   await page.waitForTimeout(500);
  //   await page
  //     .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
  //     .fill(`123-${i + 1}`); // Adding iteration number to make each entry unique
  //   await page.waitForTimeout(500);
  //   await page
  //     .getByRole("alertdialog", { name: "Tambah Transaksi" })
  //     .locator("select")
  //     .selectOption("Liter");
  //   await page.waitForTimeout(500);
  //   await page
  //     .locator("div")
  //     .filter({ hasText: /^Harga Satuan$/ })
  //     .getByPlaceholder("Rp")
  //     .click();
  //   await page.waitForTimeout(500);
  //   await page
  //     .locator("div")
  //     .filter({ hasText: /^Harga Satuan$/ })
  //     .getByPlaceholder("Rp")
  //     .fill("Rp 12");
  //   await page.waitForTimeout(500);
  //   await page.getByPlaceholder("0", { exact: true }).click();
  //   await page.waitForTimeout(500);
  //   await page.getByPlaceholder("0", { exact: true }).fill("12");
  //   await page.waitForTimeout(500);
  //   await page.getByRole("textbox", { name: "Masukkan persen" }).click();
  //   await page.waitForTimeout(500);
  //   await page.getByRole("textbox", { name: "Masukkan persen" }).fill("1%2");
  //   await page.waitForTimeout(500);
  //   await page
  //     .locator("div")
  //     .filter({ hasText: /^Potongan Harga$/ })
  //     .getByPlaceholder("Rp")
  //     .click();
  //   await page.waitForTimeout(500);
  //   await page
  //     .locator("div")
  //     .filter({ hasText: /^Potongan Harga$/ })
  //     .getByPlaceholder("Rp")
  //     .fill("0");
  //   await page.waitForTimeout(500);
  //   await page
  //     .getByText("DPPDPP Nilai Lain / DPPPPNTarif PPNTarif PPnBM (%)PPnBM")
  //     .click();
  //   await page.getByRole("button", { name: "Simpan" }).click();
  //   await page.waitForTimeout(500);
  // }
  // Repeat the transaction addition 20 times
  // for (let i = 0; i < 20; i++) {
  for (let i = 0; i < 10; i++) {
    console.log(`Starting iteration ${i + 1}`);
    if (i > 0 && i % 5 === 0) {
      // Check if page is still responsive every 5 iterations
      await page.evaluate(() => document.readyState);
    }

    try {
      await page.getByRole("button", { name: "Tambah Transaksi" }).click();
      await page.waitForTimeout(1000);

      // Add retry logic for the problematic "Barang" click
      let retries = 3;
      while (retries > 0) {
        try {
          await page.getByText("Barang").click({ timeout: 5000 });
          break;
        } catch (error) {
          if (error.message.includes("strict mode violation")) {
            await page
              .getByLabel("Tambah Transaksi")
              .getByText("Barang")
              .click();
            break;
          } else if (retries === 1) {
            throw error;
          }
          retries--;
          await page.waitForTimeout(1000);
        }
      }

      await page.waitForTimeout(1000);
      await page.locator(".css-19bb58m").click();
      await page
        .getByRole("option", { name: "010100 - Kuda, keledai, bagal" })
        .click();
      await page.waitForTimeout(500);
      await page
        .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
        .click();
      await page.waitForTimeout(500);
      await page
        .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
        .click();
      await page.waitForTimeout(500);
      await page
        .getByRole("textbox", { name: "Masukkan nama barang/jasa" })
        .fill(`123-${i + 1}`);
      await page.waitForTimeout(500);
      await page
        .getByRole("alertdialog", { name: "Tambah Transaksi" })
        .locator("select")
        .selectOption("Liter");
      await page.waitForTimeout(500);
      await page
        .locator("div")
        .filter({ hasText: /^Harga Satuan$/ })
        .getByPlaceholder("Rp")
        .click();
      await page.waitForTimeout(500);
      await page
        .locator("div")
        .filter({ hasText: /^Harga Satuan$/ })
        .getByPlaceholder("Rp")
        .fill("Rp 12");
      await page.waitForTimeout(500);
      await page.getByPlaceholder("0", { exact: true }).click();
      await page.waitForTimeout(500);
      await page.getByPlaceholder("0", { exact: true }).fill("12");
      await page.waitForTimeout(500);
      await page.getByRole("textbox", { name: "Masukkan persen" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("textbox", { name: "Masukkan persen" }).fill("1%2");
      await page.waitForTimeout(500);
      await page
        .locator("div")
        .filter({ hasText: /^Potongan Harga$/ })
        .getByPlaceholder("Rp")
        .click();
      await page.waitForTimeout(500);
      await page
        .locator("div")
        .filter({ hasText: /^Potongan Harga$/ })
        .getByPlaceholder("Rp")
        .fill("0");
      await page.waitForTimeout(500);
      await page
        .getByText("DPPDPP Nilai Lain / DPPPPNTarif PPNTarif PPnBM (%)PPnBM")
        .click();
      await page.getByRole("button", { name: "Simpan" }).click();
      await page.waitForTimeout(500);

      console.log(`Completed iteration ${i + 1}`);
    } catch (error) {
      console.log(`Error in iteration ${i + 1}:`, error.message);
      throw error;
    }
  }

  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await page.getByRole("button", { name: "OK" }).click();
});
