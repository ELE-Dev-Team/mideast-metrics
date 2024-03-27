package dev.mideastmetrics.mm.model;


import jakarta.persistence.*;

import java.time.Year;

@Entity
@Table(name = "_country")
public class CountryData {
    @EmbeddedId
    private CountryId countryId;

    private double gdpGrowth;
    private double gdpPerCapita;

    private double lifeExpectancyM;
    private double lifeExpectancyF;
    private double lifeExpectancyT;

    private double mortalityRateM;
    private double mortalityRateF;
    private double mortalityRateT;

    private double crudeBirthRateT;

//    private double accessToElectricity;
//    private double accessToCleanFuels;

    private double taxes;

//    private double literacyRateAdult;
//    private double literacyRateYouth;

    private double importsOfGoodsAndServices;

    // Population
    private double malePop;
    private double femalePop;
    private double totalPop;

    // Unemployment rate
    private double unemploymentRateT;
    private double unemploymentRateF;
    private double unemploymentRateM;

    public CountryData(String countryName, Year date) {
        this.countryId = new CountryId(countryName, date);
    }

    public CountryData() {
    }


    public CountryId getCountryId() {
        return countryId;
    }

    public void setCountryId(CountryId countryId) {
        this.countryId = countryId;
    }

    public double getGdpGrowth() {
        return gdpGrowth;
    }

    public void setGdpGrowth(double gdpGrowth) {
        this.gdpGrowth = gdpGrowth;
    }

    public double getMalePop() {
        return malePop;
    }

    public void setMalePop(double malePop) {
        this.malePop = malePop;
    }

    public double getFemalePop() {
        return femalePop;
    }

    public void setFemalePop(double femalePop) {
        this.femalePop = femalePop;
    }

    public double getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(double totalPop) {
        this.totalPop = totalPop;
    }

    public double getLifeExpectancyM() {
        return lifeExpectancyM;
    }

    public void setLifeExpectancyM(double lifeExpectancyM) {
        this.lifeExpectancyM = lifeExpectancyM;
    }

    public double getLifeExpectancyT() {
        return lifeExpectancyT;
    }

    public void setLifeExpectancyT(double lifeExpectancyT) {
        this.lifeExpectancyT = lifeExpectancyT;
    }

    public double getTaxes() {
        return taxes;
    }

    public void setTaxes(double taxes) {
        this.taxes = taxes;
    }

    public double getImportsOfGoodsAndServices() {
        return importsOfGoodsAndServices;
    }

    public void setImportsOfGoodsAndServices(double importsOfGoodsAndServices) {
        this.importsOfGoodsAndServices = importsOfGoodsAndServices;
    }

    public double getLifeExpectancyF() {
        return lifeExpectancyF;
    }

    public void setLifeExpectancyF(double lifeExpectancyF) {
        this.lifeExpectancyF = lifeExpectancyF;
    }

    public double getMortalityRateM() {
        return mortalityRateM;
    }

    public void setMortalityRateM(double mortalityRateM) {
        this.mortalityRateM = mortalityRateM;
    }

    public double getMortalityRateF() {
        return mortalityRateF;
    }

    public void setMortalityRateF(double mortalityRateF) {
        this.mortalityRateF = mortalityRateF;
    }

    public double getMortalityRateT() {
        return mortalityRateT;
    }

    public void setMortalityRateT(double mortalityRateT) {
        this.mortalityRateT = mortalityRateT;
    }

    public double getCrudeBirthRateT() {
        return crudeBirthRateT;
    }

    public void setCrudeBirthRateT(double crudeBirthRateT) {
        this.crudeBirthRateT = crudeBirthRateT;
    }

    public double getGdpPerCapita() {
        return gdpPerCapita;
    }

    public void setGdpPerCapita(double gdpPerCapita) {
        this.gdpPerCapita = gdpPerCapita;
    }

    public double getUnemploymentRateT() {
        return unemploymentRateT;
    }

    public void setUnemploymentRateT(double unemploymentRateT) {
        this.unemploymentRateT = unemploymentRateT;
    }

    public double getUnemploymentRateF() {
        return unemploymentRateF;
    }

    public void setUnemploymentRateF(double unemploymentRateF) {
        this.unemploymentRateF = unemploymentRateF;
    }

    public double getUnemploymentRateM() {
        return unemploymentRateM;
    }

    public void setUnemploymentRateM(double unemploymentRateM) {
        this.unemploymentRateM = unemploymentRateM;
    }

    @Override
    public String toString() {
        return "CountryData{" +
                "countryId=" + countryId +
                ", gdpGrowth=" + gdpGrowth +
                ", gdpPerCapita=" + gdpPerCapita +
                ", lifeExpectancyM=" + lifeExpectancyM +
                ", lifeExpectancyF=" + lifeExpectancyF +
                ", lifeExpectancyT=" + lifeExpectancyT +
                ", mortalityRateM=" + mortalityRateM +
                ", mortalityRateF=" + mortalityRateF +
                ", mortalityRateT=" + mortalityRateT +
                ", crudeBirthRateT=" + crudeBirthRateT +
                ", taxes=" + taxes +
                ", importsOfGoodsAndServices=" + importsOfGoodsAndServices +
                ", malePop=" + malePop +
                ", femalePop=" + femalePop +
                ", totalPop=" + totalPop +
                ", unemploymentRateT=" + unemploymentRateT +
                ", unemploymentRateF=" + unemploymentRateF +
                ", unemploymentRateM=" + unemploymentRateM +
                '}';
    }
}
