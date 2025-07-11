"use client"

import { useState } from "react"
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import images from "./hkm.png"

const HeritageRegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    school: "",
    address: "",
    telephone: "",
    mobile: "",
    personInCharge: "",
    phone: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.school.trim()) newErrors.school = "School name is required."
    if (!formData.address.trim()) newErrors.address = "Address is required."
    if (!formData.personInCharge.trim()) newErrors.personInCharge = "Person in charge is required."
    if (!formData.phone.trim()) newErrors.phone = "Phone is required."
    if (formData.phone && !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be a 10-digit number."
    if (formData.mobile && formData.mobile !== "" && !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile must be a 10-digit number."

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    try {
      const response = await fetch("https://heritage-server-389286764509.asia-south1.run.app/school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormData({
          school: "",
          address: "",
          telephone: "",
          mobile: "",
          personInCharge: "",
          phone: "",
        })
        alert("Registration successful!")
        // navigate('/register')
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Container maxW="2xl" py={8}>
      <Card bg={bgColor} shadow="lg" borderWidth="1px" borderColor={borderColor}>
        <CardBody p={8}>
          <VStack spacing={4} mb={8}>
            <Box w="100%" textAlign="center">
              <img
                src={images}
                alt="Hare Krishna Movement Visakhapatnam"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </VStack>

          <Box
            border="2px solid"
            borderColor="gray.400"
            borderRadius="md"
            p={3}
            mb={8}
            textAlign="center"
          >
            <Heading size="lg" color="gray.600" fontWeight="bold">
              Heritage Fest Registration Form
            </Heading>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isInvalid={!!errors.school}>
                <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                  SCHOOL
                </FormLabel>
                <Input
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  borderColor="gray.400"
                  borderRadius="none"
                  _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                />
                <FormErrorMessage>{errors.school}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address}>
                <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                  ADDRESS
                </FormLabel>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  borderColor="gray.400"
                  borderRadius="none"
                  _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                    TELEPHONE
                  </FormLabel>
                  <Input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    borderColor="gray.400"
                    borderRadius="none"
                    _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.mobile}>
                  <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                    MOBILE
                  </FormLabel>
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    borderColor="gray.400"
                    borderRadius="none"
                    _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  />
                  <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl isInvalid={!!errors.personInCharge}>
                  <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                    PERSON IN CHARGE
                  </FormLabel>
                  <Input
                    name="personInCharge"
                    value={formData.personInCharge}
                    onChange={handleInputChange}
                    borderColor="gray.400"
                    borderRadius="none"
                    _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  />
                  <FormErrorMessage>{errors.personInCharge}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel fontSize="sm" fontWeight="bold" color="gray.600" mb={1}>
                    PHONE
                  </FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    borderColor="gray.400"
                    borderRadius="none"
                    _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <Box mt={6}>
                <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                  ***Please go through the general rules and information given in the Heritage Fest poster
                  carefully before filling this form. Clearly mention the number of participants in each
                  contest.
                </Text>
              </Box>

              <Button type="submit" colorScheme="blue" size="lg" mt={6} borderRadius="md">
                Submit Registration
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default HeritageRegistrationForm
