"use client"

import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Flex,
  Skeleton,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { ArrowBackIcon, PhoneIcon } from "@chakra-ui/icons"
import { useApi } from "../hooks/useApi"
import { API_ENDPOINTS } from "../config/api"

const SchoolDetails = () => {
  const { schoolId } = useParams()
  const navigate = useNavigate()
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const { data: school, loading, error } = useApi(API_ENDPOINTS.REGISTRATION(schoolId), [schoolId])

  const handleBack = () => {
    navigate("/events")
  }

  if (error) {
    return (
      <Box>
        <Button leftIcon={<ArrowBackIcon />} onClick={handleBack} mb={6} variant="outline">
          Back to Schools List
        </Button>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Error loading school details!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box>
        <Button leftIcon={<ArrowBackIcon />} onClick={handleBack} mb={6} variant="outline">
          Back to Schools List
        </Button>
        <Skeleton height="60px" mb={4} />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Skeleton height="120px" />
          <Skeleton height="120px" />
        </SimpleGrid>
        <Skeleton height="300px" />
      </Box>
    )
  }

  if (!school) {
    return (
      <Box>
        <Button leftIcon={<ArrowBackIcon />} onClick={handleBack} mb={6} variant="outline">
          Back to Schools List
        </Button>
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>School not found!</AlertTitle>
            <AlertDescription>The requested school details could not be found.</AlertDescription>
          </Box>
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Button leftIcon={<ArrowBackIcon />} onClick={handleBack} mb={6} variant="outline">
        Back to Schools List
      </Button>

      <Card bg={cardBg} shadow="md" mb={6} borderColor={borderColor} borderWidth="1px">
        <CardHeader pb={0}>
          <Heading size="lg">{school.schoolName}</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontWeight="bold">Address:</Text>
              <Text>{school.address || "N/A"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Person In Charge:</Text>
              <Text>{school.personInCharge || "N/A"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Contact Information:</Text>
              {school.phone && (
                <Flex align="center" mt={1}>
                  <PhoneIcon mr={2} color="blue.500" />
                  <Text>Phone: {school.phone}</Text>
                </Flex>
              )}
              {school.telephone && <Text ml={6}>Telephone: {school.telephone}</Text>}
              {school.mobile && <Text ml={6}>Mobile: {school.mobile}</Text>}
            </Box>
            <Box>
              <Text fontWeight="bold">Registration Date:</Text>
              <Text>{school.createdAt ? new Date(school.createdAt).toLocaleDateString() : "N/A"}</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      <Card bg={cardBg} shadow="md" w="full" borderColor={borderColor} borderWidth="1px" mb={6}>
        <CardBody>
          <Stat>
            <StatLabel fontSize="lg">Total Participants</StatLabel>
            <StatNumber fontSize="3xl" color="green.500">
              {school.totalParticipants || 0}
            </StatNumber>
            <Text fontSize="sm" color="gray.500">
              Across {school.contests ? school.contests.length : 0} contests
            </Text>
          </Stat>
        </CardBody>
      </Card>

      {school.contests && school.contests.length > 0 && (
        <Box mb={6}>
          <Heading size="md" mb={4}>
            Contest Participation
          </Heading>
          <TableContainer borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Contest Name</Th>
                  <Th isNumeric>Participants</Th>
                </Tr>
              </Thead>
              <Tbody>
                {school.contests.map((contest) => (
                  <Tr key={contest._id}>
                    <Td>{contest.code}</Td>
                    <Td>{contest.name}</Td>
                    <Td isNumeric>
                      <Badge colorScheme={contest.participants > 20 ? "green" : "blue"} borderRadius="full" px={2}>
                        {contest.participants}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default SchoolDetails
