"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
  Container,
  Card,
  CardBody,
  Button,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  useColorModeValue,
  List,
  ListItem,
  Spinner,
  useToast,
} from "@chakra-ui/react"

const ContestRegistrationTable = () => {
  // Initial contest data
  const initialContests = [
    { code: "01", name: "Colouring (1-2)", participants: 0 },
    { code: "02", name: "Colouring (3-4)", participants: 0 },
    { code: "03", name: "Painting (5-7)", participants: 0 },
    { code: "04", name: "Painting (8-10)", participants: 0 },
    { code: "05", name: "Puranic Costumes (1-4)", participants: 0 },
    { code: "06", name: "Gita Sloka Chanting (1-4)", participants: 0 },
    { code: "07", name: "Gita Sloka Chanting (5-7)", participants: 0 },
    { code: "08", name: "Gita sloka Chanting (8-10)", participants: 0 },
    { code: "09", name: "Vocal Music (5-7)", participants: 0 },
    { code: "10", name: "Vocal Music (8-10)", participants: 0 },
    { code: "11", name: "Drama (5-7)", participants: 0 },
    { code: "12", name: "Drama (8-10)", participants: 0 },
    { code: "13", name: "Classical Dance (Group & Solo) (5-7)", participants: 0 },
    { code: "14", name: "Classical Dance (Group & Solo) (8-10)", participants: 0 },
    { code: "15", name: "Pottery Painting (5-7)", participants: 0 },
    { code: "16", name: "Pottery Painting (8-10)", participants: 0 },
    { code: "17", name: "Paper Craft Work (5-7)", participants: 0 },
    { code: "18", name: "Paper Craft Work (8-10)", participants: 0 },
  ]

  const [contests, setContests] = useState(initialContests)
  const [schools, setSchools] = useState([])
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSchools, setFilteredSchools] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const searchInputRef = useRef(null)
  const dropdownRef = useRef(null)
  const toast = useToast()

  // Calculate total participants
  const totalParticipants = contests.reduce((sum, contest) => sum + (Number.parseInt(contest.participants) || 0), 0)

  // Fetch schools from /events endpoint
  const fetchSchools = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/events")
      if (!response.ok) {
        throw new Error("Failed to fetch schools")
      }
     const data = await response.json()
     console.log(data)
setSchools(data) // 👈 extract 'data' from wrapper
setFilteredSchools(data)

    } catch (error) {
      console.error("Error fetching schools:", error)
      toast({
        title: "Error",
        description: "Failed to load schools. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load schools on component mount
  useEffect(() => {
    fetchSchools()
  }, [])

  // Filter schools based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSchools(schools)
    } else {
      const filtered = schools.filter((school) => school.school?.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredSchools(filtered)
    }
  }, [searchTerm, schools])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle participant count change
  const handleParticipantChange = (index, value) => {
    const updatedContests = [...contests]
    updatedContests[index].participants = value
    setContests(updatedContests)
  }

  // Handle school selection
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school)
    setSearchTerm(school.school)
    setShowDropdown(false)
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setShowDropdown(true)
    if (e.target.value === "") {
      setSelectedSchool(null)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedSchool) {
      toast({
        title: "School Required",
        description: "Please select a school before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (totalParticipants === 0) {
      toast({
        title: "No Participants",
        description: "Please add participants to at least one contest.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)

    const registrationData = {
      schoolId: selectedSchool._id,
      schoolName: selectedSchool.school,
      contests: contests.filter((contest) => contest.participants > 0),
      totalParticipants: totalParticipants,
    }

    try {
      const response = await fetch("http://localhost:3001/contest/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit registration")
      }

      const result = await response.json()
      console.log(result)

      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Reset form
      setContests(initialContests)
      setSelectedSchool(null)
      setSearchTerm("")
    } catch (error) {
      console.error("Error submitting registration:", error)
      toast({
        title: "Submission Failed",
        description: "Failed to submit registration. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle reset
  const handleReset = () => {
    setContests(initialContests)
    setSelectedSchool(null)
    setSearchTerm("")
  }

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const headerBgColor = useColorModeValue("gray.100", "gray.700")
  const dropdownBgColor = useColorModeValue("white", "gray.700")

  return (
    <Container maxW="4xl" py={8}>
      <Card bg={bgColor} shadow="md" borderWidth="1px" borderColor={borderColor}>
        <CardBody p={6}>
          <Box mb={6}>
            <Text fontSize="sm" color="gray.600" mb={4}>
              ***Please go through the general rules and information given in the Heritage Fest "Poster" carefully
              before filling this form. Clearly mention the number of participants in each contest.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* School Selection Dropdown */}
              <FormControl isRequired>
                <FormLabel>School Name</FormLabel>
                <Box position="relative" ref={dropdownRef}>
                  <Input
                    ref={searchInputRef}
                    placeholder="Search and select school..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                    rightElement={isLoading ? <Spinner size="sm" /> : null}
                  />

                  {showDropdown && (
                    <Box
                      position="absolute"
                      top="100%"
                      left={0}
                      right={0}
                      zIndex={10}
                      bg={dropdownBgColor}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="md"
                      maxH="200px"
                      overflowY="auto"
                      shadow="lg"
                    >
                      {filteredSchools.length > 0 ? (
                        <List>
                          {filteredSchools.map((school) => (
                            <ListItem
                              key={school.id}
                              p={3}
                              cursor="pointer"
                              _hover={{ bg: "gray.100" }}
                              onClick={() => handleSchoolSelect(school)}
                            >
                              <Text>{school.school}</Text>
                              {school.location && (
                                <Text fontSize="sm" color="gray.500">
                                  {school.location}
                                </Text>
                              )}
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Box p={3}>
                          <Text color="gray.500">{isLoading ? "Loading schools..." : "No schools found"}</Text>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>

                {selectedSchool && (
                  <Text fontSize="sm" color="green.500" mt={2}>
                    Selected: {selectedSchool.school}
                  </Text>
                )}
              </FormControl>

              {/* Contest Registration Table */}
              <Box overflowX="auto">
                <Table variant="simple" size="sm" borderWidth="1px" borderColor={borderColor}>
                  <Thead bg={headerBgColor}>
                    <Tr>
                      <Th textAlign="center" width="15%">
                        Code
                      </Th>
                      <Th textAlign="center" width="60%">
                        Contest Name
                      </Th>
                      <Th textAlign="center" width="25%">
                        No of Participants
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {contests.map((contest, index) => (
                      <Tr key={contest.code}>
                        <Td textAlign="center">{contest.code}</Td>
                        <Td>{contest.name}</Td>
                        <Td>
                          <Input
                            type="number"
                            min="0"
                            value={contest.participants}
                            onChange={(e) => handleParticipantChange(index, e.target.value)}
                            size="sm"
                            textAlign="center"
                            borderRadius="sm"
                          />
                        </Td>
                      </Tr>
                    ))}
                    <Tr fontWeight="bold">
                      <Td colSpan={2} textAlign="right">
                        Total Number of Participants for the Fest
                      </Td>
                      <Td textAlign="center" bg="gray.50">
                        {totalParticipants}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>

              <HStack justifyContent="flex-end" mt={6}>
                <Button type="button" variant="outline" mr={3} onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting} loadingText="Submitting...">
                  Submit Registration
                </Button>
              </HStack>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default ContestRegistrationTable
