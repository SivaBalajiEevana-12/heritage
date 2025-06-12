"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Text,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { SearchIcon, PhoneIcon } from "@chakra-ui/icons"
import { useApi } from "../hooks/useApi"
import { API_ENDPOINTS } from "../config/api"

const SchoolsList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const hoverBgColor = useColorModeValue("gray.50", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const { data: schools, loading, error } = useApi(API_ENDPOINTS.EVENTS)

  const handleRowClick = (school, index) => {
    // Since your API doesn't return schoolId in the events endpoint,
    // you might need to modify your backend to include it, or use index/another identifier
    // For now, I'll assume you'll modify the backend to include schoolId
    const schoolId = school.schoolId || school.id || index
    navigate(`/registrations/${schoolId}`)
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>Error loading schools!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Box>
      </Alert>
    )
  }

  const filteredSchools = schools
    ? schools.filter(
        (school) =>
          school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.personInCharge.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={4}>
          Schools List
        </Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search by school name or person in charge"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>

      <TableContainer borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>School Name</Th>
              <Th>Person In Charge</Th>
              <Th>Phone</Th>
              <Th isNumeric>Total Participants</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    </Tr>
                  ))
              : filteredSchools.map((school, index) => (
                  <Tr
                    key={school.schoolId || index}
                    onClick={() => handleRowClick(school, index)}
                    cursor="pointer"
                    _hover={{ bg: hoverBgColor }}
                    transition="background-color 0.2s"
                  >
                    <Td fontWeight="medium">{school.schoolName}</Td>
                    <Td>{school.personInCharge}</Td>
                    <Td>
                      <Box display="flex" alignItems="center">
                        <PhoneIcon mr={2} color="blue.500" />
                        <Text>{school.phone}</Text>
                      </Box>
                    </Td>
                    <Td isNumeric>
                      <Badge colorScheme="green" borderRadius="full" px={2}>
                        {school.totalParticipants}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      {!loading && filteredSchools.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">
            {searchTerm ? "No schools found matching your search." : "No schools registered yet."}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default SchoolsList
