// "use client"

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
} from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom'
import images from "./hkm.png"

const HeritageRegistrationForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    school: "",
    address: "",
    telephone: "",
    mobile: "",
    personInCharge: "",
    phone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log("Form submitted:", formData)

  try {
    const response = await fetch("https://heritage-server-production.up.railway.app/school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      // alert("Registration successful!")
      // Optionally reset the form
      setFormData({
        school: "",
        address: "",
        telephone: "",
        mobile: "",
        personInCharge: "",
        phone: "",
      })
      // navigate('/register');
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
          {/* Header Section 
          <VStack spacing={4} mb={8}>
            <HStack spacing={4} align="center">
              <Box
                w="80px"
                h="80px"
                bg="gray.700"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="xs"
                textAlign="center"
                p={2}
              >
                <VStack spacing={0}>
                  <Text fontWeight="bold" fontSize="10px">
                    HARE KRISHNA
                  </Text>
                  <Text fontWeight="bold" fontSize="10px">
                    MOVEMENT
                  </Text>
                  <Text fontSize="8px">VISAKHAPATNAM</Text>
                </VStack>
              </Box>
              <VStack align="start" spacing={1}>
                <Heading size="md" color="gray.600" fontWeight="bold">
                  HARE KRISHNA MOVEMENT - VISAKHAPATNAM
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Founder Acharya His Divine Grace A.C Bhaktivedanta Swami Prabhupada
                </Text>
                <Text fontSize="sm" color="gray.500">
                  D.No.8-22, III Road, Near Akshara Patra Foundation Kitchen,
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Gnanapuram, Visakhapatnam-530029
                </Text>
              </VStack>
            </HStack>
          </VStack>
*/}
<VStack spacing={4} mb={8}>
  <Box w="100%" textAlign="center">
    <img src={images} alt="Hare Krishna Movement Visakhapatnam" style={{ maxWidth: "100%", height: "auto" }} />
  </Box>
</VStack>

          {/* Form Title */}
          <Box border="2px solid" borderColor="gray.400" borderRadius="md" p={3} mb={8} textAlign="center">
            <Heading size="lg" color="gray.600" fontWeight="bold">
              Heritage Fest Registration Form
            </Heading>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* School Field */}
              <FormControl>
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
              </FormControl>

              {/* Address Field */}
              <FormControl>
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
              </FormControl>

              {/* Telephone and Mobile */}
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
                <FormControl>
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
                </FormControl>
              </SimpleGrid>

              {/* Person in Charge and Phone */}
              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
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
                </FormControl>
                <FormControl>
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
                </FormControl>
              </SimpleGrid>

              {/* Footer Text */}
              <Box mt={6}>
                <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                  ***Please go through the general rules and information given in the Heritage Fest "Poster carefully
                  before filling this form. Clearly mention the number of participants in each contest.
                </Text>
              </Box>

              {/* Submit Button */}
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
