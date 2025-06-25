import Input from "../Input";
import Select from "../Select";
import Checkbox from "../Checkbox";
import {
  FormSection,
  SectionTitle,
  InputRow,
  InputRowThree,
  InputRowFull,
} from "./CheckoutStyling";

const DetailsStep = ({
  formData,
  handleInputChange,
  errors,
  touched,
  availableCountries,
  availableProvinces,
}) => {
  return (
    <>
      <FormSection>
        <SectionTitle>Contact</SectionTitle>
        <Input
          type="text"
          name="contact"
          placeholder="Email or mobile phone number"
          value={formData.contact}
          onChange={handleInputChange}
          hasError={touched.contact && !!errors.contact}
          errorMessage={touched.contact ? errors.contact : ""}
        />
      </FormSection>

      <FormSection>
        <SectionTitle>Shipping Address</SectionTitle>

        <InputRow>
          <Input
            type="text"
            name="firstName"
            placeholder="Name"
            value={formData.firstName}
            onChange={handleInputChange}
            hasError={touched.firstName && !!errors.firstName}
            errorMessage={touched.firstName ? errors.firstName : ""}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Second Name"
            value={formData.lastName}
            onChange={handleInputChange}
            hasError={touched.lastName && !!errors.lastName}
            errorMessage={touched.lastName ? errors.lastName : ""}
          />
        </InputRow>

        <Input
          type="text"
          name="address"
          placeholder="Address and number"
          value={formData.address}
          onChange={handleInputChange}
          hasError={touched.address && !!errors.address}
          errorMessage={touched.address ? errors.address : ""}
        />

        <Input
          type="text"
          name="shippingNote"
          placeholder="Shipping note (optional)"
          value={formData.shippingNote}
          onChange={handleInputChange}
        />

        <InputRowThree>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            hasError={touched.city && !!errors.city}
            errorMessage={touched.city ? errors.city : ""}
          />
          <Input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            hasError={touched.postalCode && !!errors.postalCode}
            errorMessage={touched.postalCode ? errors.postalCode : ""}
          />
          <Select
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            disabled={!formData.country || availableProvinces.length === 0}
            hasError={touched.province && !!errors.province}
            errorMessage={touched.province ? errors.province : ""}
          >
            <option value="">Province</option>
            {availableProvinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </Select>
        </InputRowThree>

        <InputRowFull>
          <Select
            label="Country/Region"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            hasError={touched.country && !!errors.country}
            errorMessage={touched.country ? errors.country : ""}
          >
            <option value="">Select a country</option>
            {availableCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </InputRowFull>

        <Checkbox
          id="saveInfo"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={handleInputChange}
        >
          Save this information for a future fast checkout
        </Checkbox>
      </FormSection>
    </>
  );
};

export default DetailsStep;
